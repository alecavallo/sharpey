import React, { useCallback, useRef } from "react";
import { Grid, IconButton } from "@mui/material";
import Webcam from "react-webcam";
import { CameraAltRounded, FileUploadRounded } from "@mui/icons-material";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

type TakePictureProps = {
  imgData: string | null;
  setImgData: React.Dispatch<React.SetStateAction<string | null>>;
};

const TakePicture = (props: TakePictureProps) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      props.setImgData(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Example
      </h2>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            height={250}
            ref={webcamRef}
            width={200}
            screenshotFormat="image/jpeg"
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <IconButton aria-label="take photo">
            <CameraAltRounded onClick={capture} />
          </IconButton>
        </Grid>
        <Grid item sm={6} xs={6}>
          <IconButton aria-label="delete">
            <FileUploadRounded />
          </IconButton>
        </Grid>
        <Grid item sm={12} xs={12}>
          <img src={props.imgData ? props.imgData : ""} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TakePicture;
