import { UiButton } from "../Button";
import { Headline, Root, SubTitle, Title } from "./styled";

interface Props {
  title: string;
  subTitle?: string;
  onActionClick?: (e: any) => void;
}

export const UiModalHeader = ({ title, onActionClick, subTitle }: Props) => {
  return (
    <Root>
      <Headline>
        <Title>{title}</Title>
        {!!subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Headline>
      {!!onActionClick && (
        <UiButton rounded onClick={onActionClick}>
          ...
        </UiButton>
      )}
    </Root>
  );
};
