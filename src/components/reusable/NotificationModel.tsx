import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const NotificationModel = ({openModel , setOpenModel} : any) => {
  const notificationModel = useRef(null);

  useEffect(()=> {
    const handleClick = (e : MouseEvent)=> {
      const target = e.target as HTMLDivElement;
      if(target.id == "notification-container"){
        setOpenModel(false)
      }
    }

    document.addEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={notificationModel}
      id= "notification-container"
      className={`${
        openModel == true ? "block" : "hidden"
      } fixed  w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
      style={{
        transition : "position 1s linear ease-in"
      }}
    >
      <div
        className={`${
          openModel == true ? "translate-x-0" : "translate-x-full"
        } absolute border top-0 right-0 h-screen w-96 bg-white `}
        style={{
          transition : "transform .8s linear ease-in"
        }}
        id = "notification-model"
      >
        <div className="text-2xl font-bold text-center mt-5 flex items-center justify-between px-4">
          <Icon icon="material-symbols:close" height={24} width={24} className={'cursor-pointer'} onClick = {()=> setOpenModel(false)} /> Notifications <div></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModel;
