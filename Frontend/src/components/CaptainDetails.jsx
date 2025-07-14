import React, {useContext} from 'react'
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);

  return (
    <div>
        <div className="flex  items-center justify-between">
            <div className="flex items-center justify-between gap-3">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://s.yimg.com/ny/api/res/1.2/iMuVH3rQvZ5bevA6.Rnnew--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/aol_bored_panda_979/637e4b10e15633a58587f8fcde7e6ef0"
                alt=""
              />
              <h4 className="text-lg font-medium capitalize">{captain.fullName.firstName + ' ' + captain.fullName.lastName}</h4>
            </div>
            <div>
              <h4 className="text-xl font-semibold">₹290</h4>
              <p className="text-sm text-gray-600">Earned</p>
            </div>
          </div>
          <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
            <div className="text-center">
              <i className="text-3xl mb-2 font-thin ri-time-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div className="text-center">
              <i className="text-3xl  mb-2 font-thin ri-speed-up-fill"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div className="text-center">
              <i className="text-3xl  mb-2 font-thin ri-booklet-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails;