import { UiButton } from "@/ui/Button";
import { Header, Root } from "./styled";
import { UiTypography } from "@/ui/Typography";
import { TEXT } from "./constants";
import { UiAlert } from "@/ui/Alert";

interface Props {
  onCreate: () => void;
}

export const EmptyBoard = ({ onCreate }: Props) => {
  return (
    <Root>
      <Header>
        <UiTypography variant="h6">Welcome!</UiTypography>
      </Header>

      <UiAlert>
        <UiTypography>{TEXT}</UiTypography>
      </UiAlert>

      <UiButton
        color="primary"
        variant="contained"
        size="lg"
        onClick={onCreate}
      >
        New Board +
      </UiButton>
    </Root>
  );
};
