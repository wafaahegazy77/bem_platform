import { getLocale, getTranslations } from "next-intl/server";
import NavbarClient from "./NavbarClient";

type NavbarProps = {
    auth?: boolean;
};

export default async function Navbar({
    auth = false,
}: NavbarProps) {
    const locale = await getLocale();
    const t = await getTranslations("navbar");
    const authT = await getTranslations("auth");

    return (
        <NavbarClient
            auth={auth}
            locale={locale}
            translations={{
                products: t("products"),
                pricing: t("pricing"),
                help_center: t("help_center"),
                login: t("login"),
                english: authT("english"),
                arabic: authT("arabic"),
            }}
        />
    );
}