import { UiButton } from "@/ui/Button";
import { Header, Root } from "./styled";
import { UiTypography } from "@/ui/Typography";
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
        <UiTypography>Please Create a board to proceed.</UiTypography>
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
