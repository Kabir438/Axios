import { teacher } from "../../../pages";

export type CourseProps = {
  _id: string;
  image: string;
  description: string;
  title: string;
  teachers: teacher[];
}