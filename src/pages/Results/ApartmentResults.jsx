import React, { useState } from "react";

// Importing icons
import { MdOutlineApartment, MdAttachMoney, MdListAlt } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { BiBed } from "react-icons/bi";

// Importing Bar Chart
import BarChart from "./BarChart";

/** FAKE DATA
 * DELETE LATER
 * This object mimics format of data coming from API
 */
import apartment from "../../assets/apartments.jpg";
const results = {
  // Contains data of apartaments complex
  // This data is already filtered by the backend
  // This case is assuming that I got an array with multiple cities and apartment complexes.
  data: [
    {
      state: "CA",
      city: "San Diego",
      // List of apartments
      apartamentsList: [
        {
          monthlyRent: 1500,
          amenities: {
            petFriendly: true,
            gated: true,
            inUnitWasherDryer: true,
            pool: true,
            fitnessCenter: true,
            parking: true,
          },
          amenitiesLabel: [
            "Pet Friendly",
            "Gated",
            "In-Unit Washer/Dryer",
            "Pool",
            "Fitness Center",
            "Parking",
          ],
          image: "../../assets/apartments.jpg",
          name: "Pointe 38",
          contactPerson: "John Doe",
          contactEmail: "johndoe@gmail.com",
          bedrooms: 1,
          reviews: {},
        },
      ],
      // Livability score, generated in backend, and added to the object
      // after being filtered by db
      livabilityScore: {
        // Total score generated
        totalScore: 100,
        reviewInsides: {
          // List that display amenities selected with their score
          // These rates must be numbers to make bar chart
          petFriendly: {
            positivityRate: 5,
            negativityRate: 68,
          },
          gated: {
            positivityRate: 12,
            negativityRate: 35,
          },
          inUnitWasherDryer: {
            positivityRate: 77,
            negativityRate: 48,
          },
          pool: {
            positivityRate: 80,
            negativityRate: 17,
          },
          fitnessCenter: {
            positivityRate: 50,
            negativityRate: 100,
          },
          parking: {
            positivityRate: 21,
            negativityRate: 50,
          },
        },
      },
      //
    },
  ],
};

const ApartmentResults = () => {
  const firstCity = results.data[0];
  const firstApartmentDetails = firstCity.apartamentsList[0];

  // Setting icons, later can be a favorites functionality
  const [isFilled, setIsFilled] = useState(false);

  const filledHandler = () => {
    setIsFilled(!isFilled);
  };

  return (
    // Box container
    <div className="flex flex-col items-center border border-gray-300 rounded-md shadow-lg hover:shadow-xl py-8 w-[90%] mb-40">
      {/* Individual Box */}
      <div className="flex border relative border-gray-300 rounded-md shadow-lg hover:shadow-xl py-4 px-4 m-4">
        {!isFilled ? (
          <AiOutlineHeart
            className="absolute right-6 top-7"
            size={30}
            onClick={filledHandler}
          />
        ) : (
          <BsHeartFill
            className="absolute right-8 top-8"
            color="#C21E56"
            size={30}
            onClick={filledHandler}
          />
        )}
        {/* Img + description */}
        <div className="flex flex-col lg:justify-between items-center py-4">
          <img
            className=" rounded-[5%] w-[300px] h-[300px] border mb-2 mr-2"
            src={apartment}
            alt="apartment building"
          />
          <div className="flex flex-col p-2 my-4 w-[80%] border rounded-md border-gray-300">
            <h1 className="self-center mb-4 border-b border-gray-300">
              {firstCity.city + ", " + firstCity.state}
            </h1>

            {/* Apartment info box + icon */}
            <div className="flex items-center text-base border-b border-gray-300 my-2 ">
              <p>{<MdOutlineApartment size={20} className="mr-1" />} </p>
              <p>
                <strong>Apartment Complex: </strong>{" "}
                {`${firstApartmentDetails.name}`}
              </p>
            </div>
            {/* Apartment info box + icon */}
            <div className="flex items-center text-base border-btext-base border-b border-gray-300 my-2 ">
              <p>{<BiBed size={20} className="mr-1" />} </p>
              <p>
                <strong>Bedrooms: </strong>
                {`${firstApartmentDetails.bedrooms} `}
              </p>
            </div>
            {/* Apartment info box + icon */}
            <div className="flex items-center text-base border-btext-base border-b border-gray-300 my-2 ">
              <p>{<MdAttachMoney size={20} className="mr-1" />} </p>
              <p>
                <strong>Rent: </strong>{" "}
                {`${firstApartmentDetails.monthlyRent} `}
              </p>
            </div>
            {/* Apartment info box + icon */}
            <div className="flex items-start text-base mb-2 ">
              <p className=" self-center">
                {<MdListAlt size={20} className="mr-1" />}{" "}
              </p>

              <p>
                <strong>Amenities: </strong>
                {`${firstApartmentDetails.amenitiesLabel.join(", ")}`}
              </p>
            </div>
          </div>
          {/* Bar Chart Component. The only way to make it responsive is making 
          div relative to its parent*/}
          <div className="relative w-[90%] h-[30%] lg:h-[35%]">
            <BarChart chartData={firstCity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentResults;
