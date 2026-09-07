import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: "application/json",
        secret: process.env.API_SECRET,
    },
});

export const api = {
    getPage: (key: string, locale: string) =>
        apiClient
            .get(`/api/pages/${key}`, {
                headers: {
                    lang: locale,
                },
            })
            .then((res) => res.data),

    getServices: (locale: string) =>
        apiClient
            .get("/api/services", {
                headers: { lang: locale },
            })
            .then((res) => res.data),

    getService: (code: string, locale: string) =>
        apiClient
            .get(`/api/services/${code}`, {
                headers: { lang: locale },
            })
            .then((res) => res.data),

    getWhyBeem: (locale: string) =>
        apiClient
            .get("/api/why-beems", {
                headers: {
                    lang: locale,
                },
            })
            .then((res) => res.data),

    getPackages: (locale: string) =>
        apiClient
            .get("/api/packages", {
                headers: {
                    lang: locale,
                },
            })
            .then((res) => res.data),

    getFaqs: (locale: string) =>
        apiClient
            .get("/api/faqs", {
                headers: {
                    lang: locale,
                },
            })
            .then((res) => res.data),
};

export default apiClient;