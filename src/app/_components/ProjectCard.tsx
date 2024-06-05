import React from "react";
import BranchRow from "./BranchRow";
import Link from "next/link";
import { DeleteButton, PauseButton, PlayButton } from "./Button";

interface Branch {
  creator: string;
  name: string;
  status: string;
}

interface ProjectCardProps {
  projectName: string;
  route: string;
  branchesCount: number;
  databasesCount: number;
  instanceStatus: string;
  branches: Branch[];
  creator: string;
  createdOn: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  route,
  branchesCount,
  databasesCount,
  instanceStatus,
  branches,
  creator,
  createdOn,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="bg-white text-black shadow-md">
      <div
        className={` pr-8 py-3 flex flex-row justify-between ${isOpen ? "bg-generate-sw" : "bg-white"}`}
      >
        <div className=" flex flex-row items-center">
          <button className=" px-12" onClick={onToggle}>
            <img
              src="./images/ChevronIcon.svg"
              alt="Expand Project"
              className={`${isOpen && " rotate-180"} w-8 transition duration-300`}
            />
          </button>
          <span>
            <Link
              className=" underline"
              rel="noopener noreferrer"
              target="_blank"
              href={"https://github.com/GenerateNU/"}
            >
              {projectName}
            </Link>{" "}
            /{" "}
            <Link
              className=" underline"
              rel="noopener noreferrer"
              target="_blank"
              href={"https://github.com/GenerateNU/devdb"}
            >
              {route}
            </Link>{" "}
            - {branchesCount} branches - {databasesCount} databases
          </span>
        </div>
        <div className=" flex flex-row items-center">
          {instanceStatus === "Stopped" ? <PlayButton /> : <PauseButton />}
          <DeleteButton />
        </div>
      </div>
      <div
        className={`bg-gray-100 rounded-b-xl transition-all duration-300 overflow-hidden ${isOpen ? " h-max-fit h-96" : "h-0"}`}
      >
        <div className="bg-project-row">
          {branches.map((branch, index) => (
            <BranchRow
              key={index}
              creator={branch.creator}
              name={branch.name}
              status={branch.status}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 py-3 px-12 shadow-inner bg-white">
          <p>Created by: {creator}</p>
          <p>Created on: {createdOn}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
