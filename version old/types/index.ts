import { SVGProps } from "react";
import { IUserSchema } from "@/models/user";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
export interface CartState {
    cart: UserState;
    addToCart: (product: UserState) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}
export interface UserState {
    user: IUserSchema | null;
    setUser: (user: IUserSchema) => void;
    clearUser: () => void;
}
