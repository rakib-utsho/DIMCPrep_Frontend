"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLazyGetProfileQuery,
} from "@/redux/api/updateProfile/profile";
import { toast } from "sonner";
import Link from "next/link";

export default function UpdateUserProfile() {
  const { data: userData, isLoading: isProfileLoading } = useGetProfileQuery();
  console.log("userData", userData);
  const [updateProfile] = useUpdateProfileMutation();
  const [refetchProfile] = useLazyGetProfileQuery();

  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isProfileLoading && userData) {
      setName(userData.user?.name || "");
    }
  }, [userData, isProfileLoading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = async () => {
    if (!name || (!selectedFile && name === userData?.user?.name)) {
      toast.error("No changes to update");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: { name?: string; image?: File } = {};
      if (name && name !== userData?.user?.name) payload.name = name;
      if (selectedFile) payload.image = selectedFile;

      await updateProfile(payload).unwrap();
      await refetchProfile().unwrap();

      toast.success("Profile updated successfully");
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentImage =
    previewImage || userData?.user?.imageURL || "";
  const email = userData?.user?.email || "";
  // console.log("email", email);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <p className="text-sm text-gray-500">Update your details below</p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-28 h-28 rounded-full border bg-gray-100 shadow-inner overflow-hidden flex items-center justify-center text-gray-400 text-sm">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              "No Image"
            )}
          </div>
          <button
            onClick={triggerFileInput}
            className="text-sm text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Change Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userData?.user?.name}
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email || ""}
              disabled
              className="w-full mt-1 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link href="/">
            <button
              type="button"
              className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
