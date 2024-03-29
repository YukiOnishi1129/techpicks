import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  return (
    <div className="w-[40%] mx-auto mt-20 p-4 border-2 border-gray-300 rounded-md shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Login Page
      </h2>
      <LoginForm />
    </div>
  );
}
