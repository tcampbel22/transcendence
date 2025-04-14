import React from 'react';

interface ProfileBlockProps {
  title: string;
  children: React.ReactNode;
}

const ProfileBlock: React.FC<ProfileBlockProps> = ({ title, children }) => {
  return (
    <div className="bg-black p-4 rounded-2xl shadow mb-4">
      <h2 className="text-lg font-semibold text-white mb-2 ">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default ProfileBlock;