import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  return (
    <div className="mx-auto mt-20 w-2/5 rounded-md border-2 border-gray-300 p-4 shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Login Page
      </h2>
      <LoginForm />
    </div>
  );
}
