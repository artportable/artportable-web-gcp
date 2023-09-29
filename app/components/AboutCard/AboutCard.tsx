import React, { useEffect, useRef } from 'react'
import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room'
import { useTranslation } from 'next-i18next'
import SocialNetworksCard from '../SocialNetworksCard/SocialNetworksCard'
import InspiredByCard from '../InspiredByCard/InspiredByCard'
import { isNullOrUndefined } from '../../utils/util'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// ny

export default function AboutCard({ data, userProfilePicture, onUpdateProfilePicture, tags, isMyProfile}) {
  const s = styles()
  const { t } = useTranslation(['profile', 'tags'])
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL

 
  const fileInput = useRef(null);

  const handleFileUpload = event => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    var fr = new FileReader;
    fr.onload = function () {
      var img = new Image;
      img.onload = function () {
        onUpdateProfilePicture(event.target.files[0], img.width, img.height, 'profile')
      };

      img.src = fr.result.toString(); // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div>
        <div>
          <div style={{display: "flex", marginTop: "20px"}} className={s.aboutTextProfilePic}>
          {
              data?.ProfilePicture && (
                <div>
                {userProfilePicture && (

                  <div> 
                    
                    <img
           
                    src={`${bucketUrl}${userProfilePicture}`}
                      style={{height: '200px', width: '250px'}}
                  ></img>
                  

                      <div className={s.ChangeProfilePicture} onClick={() => fileInput.current.click()} >
                  { isMyProfile &&
                    <div >
                    <button style={{marginTop: "20px", color: "black", border: "1px solid black", borderRadius: "20px", display: "flex", alignItems: "center", textAlign: "center", backgroundColor: "transparent"}}>
                    {t("profile:changeProfilePicture")}

                    <input
                      ref={fileInput}
                      onChange={handleFileUpload}
                      type="file"
                      style={{ display: "none"}}
                      multiple={false}
                    />
                    {
                      isMyProfile && 
                      <AddCircleIcon
                        style={{margin: "5px" }}
                        color="primary"
                        />
                    }
                    </button>
                  </div>
                }
                </div>
                
                <div>
                <div className={s.textContainer}>
                {data?.Title && <Typography>{`${data?.Title}`}</Typography>}
            <div>
              {data?.Headline && <Typography>{`${data?.Headline}`}</Typography>}
            </div>
            {data?.Location && (
              <Typography>
                <RoomIcon
                  color="primary"
                  fontSize="small"
                  style={{ color: '#da8c77' }}
                ></RoomIcon>
                {`${data?.Location}`}
              </Typography>
            )}
                </div>
             <div style={{ marginTop: '5px' }}>
              {data?.SocialMedia && (
                <SocialNetworksCard
                  data={data?.SocialMedia}
                ></SocialNetworksCard>
              )}
            </div> 
          </div> 
                </div>
                
                  
                  
                )
                  
                }
            
              </div>
              )
            }
             <div style={{marginLeft: "30px"}} className={s.aboutText}>
             <div style={{display: "flex", justifyContent: "center"}}>
             {!data?.About && (
              <p style={{display: "flex", justifyContent: "center"}}>{t("profile:noBioSet")}</p>
             )}
             </div>
             
              {data?.About && (
                
              <div>
            <b>
            {t('profile:aboutArtist')}{' '}
            <a>
              {data?.Name} {data?.Surname && data?.Surname}
            </a>
            :
            </b>
                
                {" "}{data?.About}
                {data?.InspiredBy && (
            <InspiredByCard text={data?.InspiredBy}></InspiredByCard>
          )}
                </div>
                
             )}
             </div>
             
          </div>


      
            
              

            {
              !data?.ProfilePicture && (
                <div className={s.noProfilePic}>
  
                  <div style={{display: "flex", justifyContent: "center", margin: "10px", border: "1px solid black", width: "100px", height: "100px", borderRadius: "20px", textAlign: "center", alignItems: "center"}}>
                  {t("profile:NoProfilePicSet")}
                  
                  </div>
                  { isMyProfile &&
                    <div style={{display: "flex", justifyContent: "center", margin: "10px"}} >
                    <button style={{ color: "black", border: "1px solid black", borderRadius: "20px", display: "flex", alignItems: "center", textAlign: "center", backgroundColor: "transparent"}}>
                    <div>
                  
                      {t("profile:addProfilePicture")}
                  
                  </div>

                    <input
                      ref={fileInput}
                      onChange={handleFileUpload}
                      type="file"
                      style={{ display: "none" }}
                      multiple={false}
                    />
                    {
                      isMyProfile && 
                      <AddCircleIcon
                        
                        color="primary"
                        onClick={() => fileInput.current.click()} />
                    }
                    </button>
                  </div>
                }
                </div>
                
              )
              
            }
            
          
   
        </div>
        <div>
       
       
         
        </div>
      </div>
    </>
  )
}