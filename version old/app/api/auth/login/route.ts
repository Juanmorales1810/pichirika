import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import User, { IUser } from "@/models/user";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();

        const body: IUser = await request.json();
        const { correo, password } = body;

        // Validamos que se envíen todos los campos
        if (!correo || !password) {
            return NextResponse.json(
                { message: messages.error.needProps },
                { status: 400 }
            );
        }

        const userFind = await User.findOne({ correo });

        // Validamos que exista el usuario por el correo
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 400 }
            );
        }

        const isCorrect: boolean = await bcrypt.compare(
            password,
            userFind.password
        );

        // Validamos que la contraseña sea la correcta
        if (!isCorrect) {
            return NextResponse.json(
                { message: messages.error.incorrectPassword },
                { status: 400 }
            );
        }

        const { password: userPass, ...rest } = userFind._doc;

        const token = jwt.sign({ data: rest }, "secreto", {
            expiresIn: 86400,
        });

        const response = NextResponse.json(
            { userLogged: rest, message: messages.success.userLogged },
            { status: 200 }
        );

        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
