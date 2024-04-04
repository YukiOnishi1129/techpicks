"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Platform } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  keyword: z.string().optional(),
  platform: z.string().optional(),
  language: z.string().optional(),
});

type SearchFormProps = {
  platforms: Array<Platform>;
};

export const SearchForm: FC<SearchFormProps> = ({
  platforms,
}: SearchFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      language: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.keyword === "") {
      return;
    }
    router.replace(
      `/?languageStatus=${values.language}&keyword=${values.keyword}`
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3>search condition</h3>
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keyword</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is search keyword.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* language */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <RadioGroupItem value={"1"}>Japanese</RadioGroupItem>
                    <RadioGroupItem value={"2"}>English</RadioGroupItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>This is search keyword.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* platform */}
          {/* category */}
          {/*  */}

          {/* <h3>sort condition</h3> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
