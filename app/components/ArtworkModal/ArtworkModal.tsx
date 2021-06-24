import React from 'react';
import { Wrapper, Content, Slide, Image,  Prev, Next } from './styles';
import Link from 'next/link';

interface IProps {
  src: Src[];
  currentIndex?: number;
  backgroundStyle?: any;
  onClose: () => void;
}

interface IState {
  currentIndex: number;
}

interface Src {
  url: string,
  id: string,
  alt: string
}

export default class ArtworkModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.callOnClose = this.callOnClose.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('wheel', this.handleWheel);

    this.state = {
      currentIndex: this.props.currentIndex === undefined
        ? 0
        : this.props.currentIndex,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('wheel', this.handleWheel);
  }

  private changeImage(direction: number) {
    let nextIndex = this.state.currentIndex + direction;

    if (nextIndex > this.props.src.length - 1) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = this.props.src.length - 1;
    }

    this.setState({
      currentIndex: nextIndex,
    });
  }

  private callOnClose() {
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    }
  }

  private handleKeyDown(event: any) {
    if (event.key === 'Escape') {
      this.callOnClose();
    }

    if (['ArrowLeft', 'h'].includes(event.key)) {
      this.changeImage(-1);
    }

    if (['ArrowRight', 'l'].includes(event.key)) {
      this.changeImage(1);
    }
  }

  private handleClick(event: any) {
    if (event.target && event.target.className.includes('simple-image-viewer__slide')) {
      this.callOnClose();
    }
  }

  private handleWheel(event: any) {
    if (event.wheelDeltaY > 0) {
      this.changeImage(-1);
    } else {
      this.changeImage(1);
    }
  }

  render() {
    const { src } = this.props;
    const { currentIndex } = this.state;

    return (
      <Wrapper
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        className="react-simple-image-viewer__modal"
        style={this.props.backgroundStyle}
      >
        {src.length > 1 && <Prev className="react-simple-image-viewer__previous" onClick={() => this.changeImage(-1)}>
          &#10094;
        </Prev>}

        {src.length > 1 && <Next className="react-simple-image-viewer__next" onClick={() => this.changeImage(1)}>
          &#10095;
        </Next>}

        <Content className="react-simple-image-viewer__modal-content">
          <Slide className="react-simple-image-viewer__slide">
            <Link href={`/art/${src[currentIndex].id}`}>
              <a>
                <Image src={src[currentIndex].url} alt={src[currentIndex].alt}/>
              </a>
            </Link>
          </Slide>
        </Content>
      </Wrapper>
    );
  }
}
