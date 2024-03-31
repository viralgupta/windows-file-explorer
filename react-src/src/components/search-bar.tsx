import { useTabState } from "../state/tab";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../@/shadcn-components/ui/breadcrumb";

import { useEffect, useState } from "react";

export const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
    >
      <path
        d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
        fill="#ffffff"
      />
    </svg>
  );
};

export const Rotate_Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      version="1.1"
      className="fill-white w-4 h-4 p-0.5"
    >
      <path d="M30.537 20.871c-0.157-0.076-0.341-0.12-0.535-0.12-0.495 0-0.924 0.287-1.128 0.704l-0.003 0.007c-2.094 4.345-6.464 7.289-11.522 7.289-7.042 0-12.751-5.709-12.751-12.751s5.708-12.751 12.75-12.751h0c0.009-0 0.019-0 0.029-0 3.771 0 7.155 1.653 9.468 4.274l0.012 0.014h-4.582c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h7.072c0.030 0 0.055-0.015 0.084-0.017 0.179-0.023 0.341-0.070 0.491-0.138l-0.011 0.004c0.026-0.013 0.055-0.013 0.080-0.029 0.038-0.031 0.072-0.062 0.105-0.096l0-0c0.071-0.053 0.134-0.11 0.19-0.174l0.001-0.001c0.093-0.117 0.171-0.252 0.227-0.397l0.003-0.010c0.024-0.073 0.042-0.158 0.050-0.246l0-0.005c0.011-0.038 0.021-0.086 0.028-0.135l0.001-0.006v-7.071c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 3.472c-2.736-2.742-6.519-4.439-10.698-4.439-0.018 0-0.036 0-0.054 0h0.003c-8.421 0.002-15.247 6.829-15.247 15.25 0 8.422 6.828 15.25 15.25 15.25 6.047 0 11.272-3.52 13.738-8.622l0.040-0.091c0.077-0.157 0.122-0.342 0.122-0.538 0-0.495-0.288-0.923-0.706-1.125l-0.007-0.003z" />
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4 stroke-white"
      fill="none"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Chevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-4 h-4 stroke-white"
    >
      <path
        fill="white"
        d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
      />
    </svg>
  );
};

export const PC_Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="w-4 h-4 stroke-white mx-2"
    >
      <g>
        <path d="M477.984,39.203H34.016C15.219,39.203,0,54.438,0,73.219v283.969c0,18.781,15.219,34.016,34.016,34.016H220   v7.578c0,18.781-15.219,34.016-34.016,34.016H136v40h73.188h93.625H376v-40h-49.984c-18.797,0-34.016-15.234-34.016-34.016v-7.578   h185.984c18.797,0,34.016-15.234,34.016-34.016V73.219C512,54.438,496.781,39.203,477.984,39.203z M464,315.859   c0,6.266-5.078,11.344-11.344,11.344H59.344c-6.266,0-11.344-5.078-11.344-11.344V98.547c0-6.266,5.078-11.344,11.344-11.344   h393.313c6.266,0,11.344,5.078,11.344,11.344V315.859z" />
      </g>
    </svg>
  );
};

const Search_Bar = () => {
  const { tabState, tabAction } = useTabState();
  const [searchinput, setSearchinput] = useState<null | string>(null);
  const [searchinputfoucsed, setSearchinputfoucsed] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { path: string; name: string }[] | null
  >(null);

  const getResults = async () => {
    if (searchinput === null) return;
    const results = await tabAction.SearchFolder(
      searchinput,
      tabState.Tabs[tabState.focusedTab].location
    );
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchinput === null || searchinput === "") return;
    getResults();
  }, [searchinput]);

  return (
    <div className="h-10 flex bg-[#2c2c2c] p-1 px-3 text-white fill-white stroke-white border-b border-[#454545]">
      <div className="flex w-min">
        <div className="flex h-full items-center justify-center mx-2 rounded-md hover:bg-[#454545] aspect-square">
          <Arrow />
        </div>
        <div className="flex h-full items-center justify-center aspect-square mx-2 rotate-180 rounded-md hover:bg-[#454545]">
          <Arrow />
        </div>
        <div className="flex h-full items-center justify-center aspect-square mx-2 rotate-90 rounded-md hover:bg-[#454545]">
          <Arrow />
        </div>
        <div className="flex h-full items-center mx-2 justify-center aspect-square rounded-md hover:bg-[#454545]">
          <Rotate_Arrow />
        </div>
      </div>
      <div className="bg-[#454545] h-full w-full mx-1 rounded-sm px-2 flex items-center overflow-x-scroll hide-scroll">
        <Breadcrumb>
          <BreadcrumbList className="overflow-x-scroll hide-scroll">
            {tabState.Tabs.length > 0 &&
              tabState.Tabs[tabState.focusedTab].location
                .split("/")
                .map((loc, index) => {
                  if (loc === "") return;
                  return (
                    <div key={index} className="w-max h-full flex items-center">
                      <BreadcrumbItem
                        onClick={() => {
                          tabAction.navigateToPath(
                            tabState.Tabs[tabState.focusedTab].location.slice(
                              0,
                              tabState.Tabs[
                                tabState.focusedTab
                              ].location.indexOf(loc) + loc.length
                            ),
                            loc
                          );
                        }}
                        key={index + 100}
                        className=""
                      >
                        <BreadcrumbLink className="hover:bg-[#515151] p-1 px-2 rounded-sm hover:cursor-pointer ">
                          {loc == "" && index === 0 ? (
                            <PC_Icon />
                          ) : (
                            loc.replace(" ", "\u00A0")
                          )}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index !==
                        tabState.Tabs[tabState.focusedTab].location.split("/")
                          .length -
                          1 && <BreadcrumbSeparator />}
                    </div>
                  );
                })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative bg-[#454545] w-1/4 focus-within:w-1/2 duration-500 transition-[width] focus-within:bg-[#202020] rounded-sm flex items-center px-1">
        <input
          onChange={(e) => {
            setSearchinput(e.target.value);
          }}
          onFocus={() => setSearchinputfoucsed(true)}
          onBlur={() => {
            setTimeout(() => {
              setSearchinputfoucsed(false);
            }, 200);
          }}
          placeholder={`Search ${
            tabState.Tabs.length > 0 &&
            tabState.Tabs[tabState.focusedTab].folder
          }`}
          type="text"
          className="bg-[#454545] focus:bg-[#202020] focus:ring-0 focus:border-0 focus:outline-0 h-full w-full text-sm"
        />
        <SearchIcon />
        {!!searchinput && searchinput.length > 0 && searchinputfoucsed && (
          <div className="absolute top-0 translate-y-9 left-0 w-full h-auto bg-[#454545] bg-opacity-95 rounded-sm p-1 text-sm text-[#e0e0e0] max-h-44 overflow-x-scroll hide-scroll">
            {searchResults &&
              searchResults.length > 0 &&
              searchResults.map((result, index) => {
                return (
                  <div
                    onClick={(e) => {e.stopPropagation();tabAction.navigateToPath(result.path, result.name);}}
                    key={index}
                    className="p-1 z-20 hover:bg-[#202020] hover:cursor-pointer rounded-sm flex items-center"
                  >
                    {result.name.replace(" ", "\u00A0")}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search_Bar;
