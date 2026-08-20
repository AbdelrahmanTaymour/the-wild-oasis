import UpdateSettingForm from "../features/settings/UpdateSettingForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingForm />
    </Row>
  );
}

export default Settings;
