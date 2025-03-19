import { TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);
  
  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="max-w-5xl w-full mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Profile Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl backdrop-filter backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Profile</h1>
          <div className="h-1 w-12 bg-amber-500 mb-6 rounded-full"></div>
          
          <table className="w-full text-gray-800 dark:text-white">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 font-medium">Name</td>
                <td className="py-3">{profile.data.name}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 font-medium">Email</td>
                <td className="py-3">{profile.data.email}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 font-medium">Tel.</td>
                <td className="py-3">{profile.data.tel}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Member Since</td>
                <td className="py-3">{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Booking Form Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl backdrop-filter backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Book a Venue</h1>
          <div className="h-1 w-12 bg-amber-500 mb-6 rounded-full"></div>
          
          <form className="flex flex-col items-center p-5 gap-9">
            <TextField
              variant="standard"
              name="Name-Lastname"
              label="Name-Lastname"
              className="w-[65%] bg-white"
              defaultValue={profile.data.name}
              sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ffa500',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#ffa500',
                },
              }}
            />
            
            <TextField
              variant="standard"
              name="Contact-Number"
              label="Contact-Number"
              className="w-[65%] bg-white"
              defaultValue={profile.data.tel}
              sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ffa500',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#ffa500',
                },
              }}
            />
            
            <Select
              variant="standard"
              name="venue"
              id="venue"
              className="bg-white w-[65%]"
              defaultValue=""
              sx={{
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#ffa500',
                },
              }}
            >
              <MenuItem value={"Bloom"}>The Bloom Pavilion</MenuItem>
              <MenuItem value={"Spark"}>Spark Space</MenuItem>
              <MenuItem value={"GrandTable"}>The Grand Table</MenuItem>
            </Select>
            
            <DateReserve />
            
            <button
              name="Book Venue"
              className="text-white rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 shadow-sm hover:from-amber-600 hover:to-amber-700 hover:shadow-lg transition-all duration-300"
            >
              Book Venue
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}