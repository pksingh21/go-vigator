import { Card, List } from "antd";
import CardComponent from "./SingleCard";
import { FileCustomType } from "./App";
interface DisplayFolderFilesProps {
  files: FileCustomType[];
  currentPath: string;
}
function DisplayFolderFiles(props: DisplayFolderFilesProps) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={props.files}
      renderItem={(item) => (
        <List.Item>
          {/* <Card title={item.Name}></Card> */}
          <CardComponent />
        </List.Item>
      )}
    />
  );
}

export default DisplayFolderFiles;
