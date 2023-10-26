import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faDownload,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const HeadSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-8">
        <img
          className="w-24 rounded-full"
          src="/Alexander_the_Great_mosaic.jpg"
        />
        <h1 className="text-4xl">Reading</h1>
      </div>
      <div>
        <h2 className="text-3xl text-indigo-600">1. Alexander the Great</h2>
        <p className="text-md pt-2">
          Enjoy the reading, and remember that your TA is always there to help
        </p>
      </div>
      <div className="flex flex-col md:flex-row  items-center md:justify-between gap-2 md:gap-0 ">
        <ul className="flex flex-row gap-2">
          <li className=" w-12 border rounded-3xl border-indigo-600 border-solid flex justify-center items-center text-indigo-600">
            A2
          </li>
          <li className=" w-12 border rounded-3xl bg-indigo-600 border-indigo-600 border-solid flex justify-center items-center text-white">
            B1
          </li>
          <li className=" w-12 border rounded-3xl border-indigo-600 border-solid flex justify-center items-center text-indigo-600">
            B2
          </li>
          <li className=" w-12 border rounded-3xl border-indigo-600 border-solid flex justify-center items-center text-indigo-600">
            C1
          </li>
        </ul>
        <ul className="flex flex-row gap-4">
          <button>
            <FontAwesomeIcon
              icon={faDownload}
              className=" text-indigo-600"
            ></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon
              icon={faVolumeHigh}
              className=" text-indigo-600"
            ></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon
              icon={faShareNodes}
              className=" text-indigo-600"
            ></FontAwesomeIcon>
          </button>
        </ul>
      </div>
    </section>
  );
};

export default HeadSection;
