export const dynamic = "force-dynamic";
import Result from "@/components/Result/Result";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result",
};

export default async function page({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const examId = (await params).examId;
  // console.log({ examId });
  return (
    <div>
      <Result examId={examId} />
    </div>
  );
}
