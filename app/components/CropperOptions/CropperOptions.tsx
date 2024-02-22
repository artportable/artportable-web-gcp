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
import { useTranslation } from "next-i18next";
import clsx from 'clsx';

export default function CropperOptions({ show, cropper, onCrop, onDiscard }) {
  const s = styles();
  const { t } = useTranslation(["upload"]);

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
    <div className={clsx(s.cropperOptions, !show && s.hide)}>
      <ButtonGroup disableElevation variant="outlined" color="primary" className={s.fiveButtons}>
        <Button
          variant={getButtonVariant("free")}
          onClick={() => changeAspectRatio("free", true)}>
          {t('free')}
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
        <Button
          variant={getButtonVariant("3:2")}
          onClick={() => changeAspectRatio("3:2", true)}>
          3:2
        </Button>
        <Button
          variant={getButtonVariant("1:1")}
          onClick={() => changeAspectRatio("1:1", true)}>
          1:1
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary" className={s.twoButtons}>
        <Button
          aria-label='Zoom out'
          classes={{ startIcon: s.startIcon }}
          onClick={() => cropper.zoom(-0.1)}
          startIcon={<ZoomOutIcon />}>{t('zoomOut')}
        </Button>
        <Button
          aria-label='Zoom in'
          classes={{ startIcon: s.startIcon }}
          onClick={() => cropper.zoom(0.1)}
          startIcon={<ZoomInIcon />}>{t('zoomIn')}
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary" className={s.twoButtons}>
        <Button
          aria-label='Rotate left'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(-45)}
          startIcon={<RotateLeftIcon />}>{t('rotate')}
        </Button>
        {/* Buttons for rotating 0.3 degrees at a time: */}
        {/*<Button
          aria-label='Rotate left'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(-0.3)}
          startIcon={<Replay5Icon />}>
        </Button>*/}
        {/*<Button
          aria-label='Rotate right'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(0.3)}
          startIcon={<Forward5Icon />}>
        </Button>*/}
        <Button
          aria-label='Rotate right'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => cropper.rotate(45)}
          startIcon={<RotateRightIcon />}>{t('rotate')}
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="outlined" color="primary" className={s.twoButtons}>
        <Button
          aria-label='Flip horizontal'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => {
            cropper.scaleX(scaleX);
            setScaleX(scaleX * -1);
          }}
          startIcon={<SwapHorizIcon />}>{t('horizontal')}
        </Button>
        <Button
          aria-label='Flip vertical'
          classes={{ startIcon: s.startIcon }}
          variant="outlined"
          color="primary"
          onClick={() => {
            cropper.scaleY(scaleY);
            setScaleY(scaleY * -1);
          }}
          startIcon={<SwapVertIcon />}>{t('vertical')}
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation color="primary" className={s.twoButtons}>
        <Button
          aria-label='Reset'
          classes={{ startIcon: s.startIcon }}
          startIcon={<LoopIcon />}
          onClick={() => { cropper.reset() }}>{t('reset')}
        </Button>
        <Button
          aria-label='Delete'
          classes={{ startIcon: s.startIcon}}
          // classes={{ startIcon: s.startIcon, root: s.deleteIconButton }}
          startIcon={<DeleteIcon />}
          onClick={onDiscard}
            variant="outlined">{t('throw')}
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation color="primary">
        <Button
            aria-label='Done'
            classes={{ startIcon: s.startIcon }}
            startIcon={<DoneIcon />}
            onClick={onCrop}
            className={s.done}
            // color="primary"
            // variant="contained">
            >
        </Button>
      </ButtonGroup>
    </div>
  );
}