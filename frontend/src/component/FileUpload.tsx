/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "../@/lib/utils";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: any;
    onChange: (value: any) => void;
    sizeDescription: string;
    isValid: boolean
    preview: string | undefined,
    setPreview: Dispatch<SetStateAction<string | undefined>>
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ preview, setPreview, value, sizeDescription, isValid, onChange, ...props }, ref) => {
        {
            const [dragging, setDragging] = useState<boolean>(false);
            // select file from input
            const [selectedFile, setSelectedFile] = useState();
            useEffect(() => {
                if (!selectedFile) {
                    setPreview(undefined);
                    return;
                }

                const objectUrl = URL.createObjectURL(selectedFile);
                setPreview(objectUrl);
                // free memory when ever this component is unmounted
                return () => URL.revokeObjectURL(objectUrl);
            }, [selectedFile]);

            const onSelectFile = (e: any) => {
                if (!e.target.files || e.target.files.length === 0) {
                    setSelectedFile(undefined);
                    return;
                }
                setSelectedFile(e.target.files[0]);
                onChange(e.target.files[0]);
            };

            const handleDragOver = (e: any) => {
                e.preventDefault();
                setDragging(true);
            };

            const handleDragLeave = (e: any) => {
                e.preventDefault();
                setDragging(false);
            };
            const handleDrop = (e: any) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files?.[0];
                setSelectedFile(file);
                onChange(file);
            };

            return (
                <>
                    {preview == undefined && (
                        <div
                            className={cn(`${dragging ? "bg-green-200" : ""
                                } mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 text-center dark:bg-zinc-800 py-2 `, isValid && "border-red-700")}
                        >
                            <input
                                {...props}
                                ref={ref}
                                type="file"
                                accept="image/*"
                                id="fileUpload"
                                onChange={onSelectFile}
                                className="sr-only"
                            />
                            <label
                                htmlFor="fileUpload"
                                className={` relative mt-4 flex flex-col w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500 text-green-600`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="mx-auto block h-12 w-12 align-middle text-gray-400 text-center"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="mt-3 text-center">
                                    {" "}
                                    Choose files or drag and drop
                                </p>
                                <p className="m-0 h-[1.25rem] text-xs leading-5 text-gray-600 font-[400] text-center">
                                    {sizeDescription}
                                </p>
                            </label>
                        </div>
                    )}
                </>
            );
        }
    }
);
FileUpload.displayName = "FileUpload";
export { FileUpload };
