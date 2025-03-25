import axios, { AxiosRequestConfig, Method } from "axios";
import { useRouter } from "next/navigation";
// import useStore from '@/context/store'
import { toast } from "sonner";
import Image from "next/image";

interface AuthFetchProps {
    endpoint: string;
    redirectRoute?: string;
    formData?: any;
    options?: AxiosRequestConfig<any>;
    method?: Method;
}

export function useFetch() {
    // const setUser = useStore((state) => state.setUser);
    const router = useRouter();

    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options,
        method = "post", // default method is post
    }: AuthFetchProps) => {
        try {
            const { data } = await axios({
                url: `/api/${endpoint}`,
                method,
                data: formData,
                ...options,
            });
            console.log(data.message);
            if (data.message) {
                toast(
                    <div className="flex justify-around items-center gap-4 w-full">
                        <Image
                            src="/icon-192x192.png"
                            width={40}
                            height={40}
                            alt="PichiriKa"
                        />
                        <h1 className="font-semibold">{data.message}</h1>
                    </div>,
                    {
                        unstyled: true,
                        style: {
                            backgroundColor: "#d9f99d",
                            color: "#365314",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            borderRadius: "16px",
                        },
                    }
                );
            }
            // if (data.userLogged) {
            //     setUser(data.userLogged)
            // }
            if (redirectRoute) {
                router.push(redirectRoute);
                router.refresh();
            }
            return data;
        } catch (error: any) {
            console.log(error.response.data.message || error);
        }
    };

    return authRouter;
}
