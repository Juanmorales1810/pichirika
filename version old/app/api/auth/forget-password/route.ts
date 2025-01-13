import { EmailTemplate } from "@/components/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/user";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend("re_Rx3xw6Wb_3NPtFYfWVbHwSvhTLuSBY918");

export async function POST(request: NextRequest) {
    try {
        const body: { email: string } = await request.json();

        const { email } = body;

        await connectMongoDB();
        const userFind = await User.findOne({ email });

        // Validar que exista el usuario
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 400 }
            );
        }

        const tokenData = {
            email: userFind.email,
            userId: userFind._id,
        };

        const token = jwt.sign({ data: tokenData }, "secreto", {
            expiresIn: 86400,
        });

        const forgetUrl = `http://localhost:3000/guard/changepassword?token=${token}`;

        // @ts-ignore
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Cambio de Contraseña",
            react: EmailTemplate({ buttonUrl: forgetUrl }),
        });

        return NextResponse.json(
            { message: messages.success.emailSent },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
