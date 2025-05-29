import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../../schemas/login.schema";
import { ILoginForm } from "../../types/ILoginForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function LoginPage() {
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Form {...form}>
        <form
          className="px-8 py-6 rounded-2xl shadow-xl flex flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            Sign in
          </h1>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your email address used for login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your password used for login. Make sure it's strong!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
