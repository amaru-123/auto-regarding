import React from 'react';
import LegalExamPrepLanding from '@/components/legal-exam-prep-landing';

// page.tsx
const Page = () => {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white p-8">
        {/* 他のコンテンツ */}
        <LegalExamPrepLanding />
        {/* 他のコンテンツ */}
      </div>
    </div>
  );
};

export default Page;

