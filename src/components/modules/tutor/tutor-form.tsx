"use client";

import { createTutorProfile, updateTutorProfile } from "@/actions/tutor.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/types/categories.interface";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  hourlyRate: z.number().min(1, "This field is required"),
  yearsExperience: z.number().min(0, "This field is required"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type TutorFormMode = "create" | "update";

interface TutorFormValues {
  hourlyRate: number;
  yearsExperience: number;
  categories: string[];
}

export function TutorForm({
  categories,
  mode = "create",
  initialValues,
  ...props
}: React.ComponentProps<typeof Card> & {
  categories: ICategory[];
  mode?: TutorFormMode;
  initialValues?: Partial<TutorFormValues>;
}) {
  const form = useForm({
    defaultValues: {
      hourlyRate: initialValues?.hourlyRate ?? 100,
      yearsExperience: initialValues?.yearsExperience ?? 2,
      categories: initialValues?.categories ?? ([] as string[]),
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        mode === "create" ? "Creating tutor profile" : "Updating tutor profile",
      );

      try {
        const res =
          mode === "create"
            ? await createTutorProfile({
                hourlyRate: value.hourlyRate,
                yearsExperience: value.yearsExperience,
                categories: value.categories,
              })
            : await updateTutorProfile({
                hourlyRate: value.hourlyRate,
                yearsExperience: value.yearsExperience,
                categoryIds: value.categories,
              });

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success(
          mode === "create"
            ? "Tutor profile created successfully"
            : "Tutor profile updated successfully",
          { id: toastId },
        );
        if (mode === "create") {
          form.reset();
        }
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create Tutor Profile" : "Update Tutor Profile"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Enter your tutor information to create your profile."
            : "Update your tutor profile information."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="tutor-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="hourlyRate"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Hourly Rate</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        field.handleChange(
                          nextValue === ""
                            ? (undefined as unknown as number)
                            : Number(nextValue),
                        );
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="yearsExperience"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Years of Experience
                    </FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        field.handleChange(
                          nextValue === ""
                            ? (undefined as unknown as number)
                            : Number(nextValue),
                        );
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="categories"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const selected = field.state.value;

                return (
                  <Field>
                    <FieldLabel>Categories</FieldLabel>
                    <div className="grid gap-2">
                      {categories.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No categories available.
                        </p>
                      ) : (
                        categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-input"
                              checked={selected.includes(category.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.handleChange([
                                    ...selected,
                                    category.id,
                                  ]);
                                } else {
                                  field.handleChange(
                                    selected.filter((id) => id !== category.id),
                                  );
                                }
                              }}
                            />
                            <span>{category.name}</span>
                          </label>
                        ))
                      )}
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="tutor-form" type="submit" className="w-full">
          {mode === "create" ? "Create Profile" : "Update Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
