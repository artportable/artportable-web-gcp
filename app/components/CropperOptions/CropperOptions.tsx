import React, { useState } from 'react'
import { styles } from './cropperOptions.css'
import { Button, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Forward5Icon from '@material-ui/icons/Forward5';
import Replay5Icon from '@material-ui/icons/Replay5';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LoopIcon from '@material-ui/icons/Loop';

export default function CropperOptions({ cropper, onCrop, onDiscard }) {
  const s = styles();

  const [aspectRatio, setAspectRatio] = useState("free");
  const [scaleX, setScaleX] = useState(-1);
  const [scaleY, setScaleY] = useState(-1);

  const getButtonVariant: (btnAspectRatio: string) => "contained" | null
    = (buttonAspectRatio: string) => aspectRatio === buttonAspectRatio ? "contained" : null;

  const changeAspectRatio = (ratio: string, update: boolean = false) => {
    if(ratio !== "free") {
      const numbers: unknown[] = ratio.split(":");
      const numberRatio: number = (numbers[0] as number) / (numbers[1] as number);
      cropper.setAspectRatio(numberRatio);
    } else {
      cropper.setAspectRatio();
    }
    
    setAspectRatio(ratio);
  }

  return (
    <div className={s.cropperOptions}>
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button
          variant={getButtonVariant("free")}
          onClick={() => changeAspectRatio("free", true)}>
          Free
        </Button>
        <Button
          variant={getButtonVariant("16:9")}
          onClick={() => changeAspectRatio("16:9", true)}>
          16:9
        </Button>
        <Button
          variant={getButtonVariant("4:3")}
          onClick={() => changeAspectRatio("4:3", true)}>
          4:3
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button
          classes={{ startIcon: s.startIcon }}
          onClick={() => cropper.zoom(-0.1)}
          startIcon={<ZoomOutIcon />}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon }}
          onClick={() => cropper.zoom(0.1)}
          startIcon={<ZoomInIcon />}>
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(-45)}
          startIcon={<RotateLeftIcon />}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(-0.3)}
          startIcon={<Replay5Icon />}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(0.3)}
          startIcon={<Forward5Icon />}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(45)}
          startIcon={<RotateRightIcon />}>
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary">
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => {
            cropper.scaleX(scaleX);
            setScaleX(scaleX * -1);
          }}
          startIcon={<SwapHorizIcon />}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => {
            cropper.scaleY(scaleY);
            setScaleY(scaleY * -1);
          }}
          startIcon={<SwapVertIcon />}>
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button
          classes={{ startIcon: s.startIcon }}
          startIcon={<LoopIcon />}
          onClick={() => { cropper.reset() }}>
        </Button>
        <Button
          classes={{ startIcon: s.startIcon, root: s.deleteIconButton }}
          startIcon={<DeleteIcon />}
          onClick={onDiscard}>
        </Button>
        <Button 
          classes={{ startIcon: s.startIcon }}
          startIcon={<DoneIcon />}
          onClick={onCrop}>
        </Button>
      </ButtonGroup>
    </div>
  );
}