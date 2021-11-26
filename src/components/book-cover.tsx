import * as React from "react";


interface PropsType {
  coverImgUrl: string | ArrayBuffer,
}


export const BookCover: React.FC<PropsType> = (props: PropsType) => {
  const {coverImgUrl} = props;

  return (
    <div className="img-wrapper">
      {typeof coverImgUrl === `string` && <img src={coverImgUrl} />}
    </div>
  );
};
