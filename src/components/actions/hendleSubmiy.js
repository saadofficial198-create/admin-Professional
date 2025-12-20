import Cookies from "js-cookie";

export const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
        const res = await fetch(`${process.env.REACT_APP_ADMIN_LOGIN_BACKEND_API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Login failed");
            return;
        }
        Cookies.set("token", data.token, {
            secure: true,
            sameSite: "Strict"
        });
        alert("Login successful!");

        // Redirect or load admin dashboard
        window.location.href = "/"; // adjust route
    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};
