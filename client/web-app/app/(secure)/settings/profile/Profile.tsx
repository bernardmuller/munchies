"use client";

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  items?: number;
  lists?: number;
}

export default function Profile({
  image,
  firstName,
  lastName,
  email,
  lists,
  items,
}: Props) {
  return (
    <div className="min-h-[50vh] text-center ">
      <h2 className="text-2xl font-bold text-center mb-1">
        My Profile
      </h2>
      <div className="space-y-4 p-4 w-full flex flex-col items-center">
        <div className="relative">
          <img
            src={image}
            alt="profile-pic"
            className="w-24 h-24 rounded-full object-cover bg-slate-100"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
            <p className="text-sm text-muted-foreground">
              {email}
            </p>
          </div>
          {/*<div className="space-x-2">*/}
          {/*  <Button variant="outline" size="sm" className="text-white border-white hover:bg-gray-800">*/}
          {/*    Edit Profile*/}
          {/*  </Button>*/}
          {/*  <Button variant="outline" size="sm" className="text-white border-white hover:bg-gray-800">*/}
          {/*    View archive*/}
          {/*  </Button>*/}
          {/*  <Button variant="outline" size="sm"*/}
          {/*          className="text-white border-white hover:bg-gray-800 rounded-full px-2">*/}
          {/*    <Archive className="h-4 w-4"/>*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <div className="flex space-x-4">
          <span><strong>{lists}</strong> lists</span>
          <span><strong>{items}</strong> items</span>
          {/*<span><strong>13</strong> meals</span>*/}
        </div>
        <div className="space-y-2">
          {/*<h2 className="font-semibold">Bernard Muller</h2>*/}
          {/*<p className="flex items-center">*/}
          {/*  <Pencil className="h-4 w-4 mr-2"/>*/}
          {/*  bernard_muller*/}
          {/*</p>*/}
          {/*<p className="flex items-center">*/}
          {/*  💼 Software Engineer*/}
          {/*</p>*/}
          {/*<p className="flex items-center">*/}
          {/*  🎓 BSc Architecture @ University of Pretoria*/}
          {/*</p>*/}
          {/*<p className="flex items-center">*/}
          {/*  📍 Cape Town, South Africa*/}
          {/*</p>*/}
          {/*<p className="flex items-center">*/}
          {/*  <LinkIcon className="h-4 w-4 mr-2"/>*/}
          {/*  <a href="http://www.bernardmuller.co.za"*/}
          {/*     className="text-blue-400 hover:underline">www.bernardmuller.co.za</a>*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  );
}