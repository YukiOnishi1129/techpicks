import { FC } from "react";

import { LoginForm } from "./LoginForm";

export const LoginTemplate: FC = () => {
  return (
    <div className="mx-auto mt-8 w-4/5 rounded-md border-2 border-gray-200 p-4 shadow-md md:w-3/5">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Log in to Geek Picks
      </h1>
      <div className="mx-auto my-24 flex  justify-center">
        <LoginForm />
      </div>
    </div>
  );
};
