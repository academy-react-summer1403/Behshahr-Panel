import "@styles/react/libs/react-select/_react-select.scss";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { usePostSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);
const AddUserModal = ({ data }) => {
  const queryClient = useQueryClient();

  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: addNewTask } = usePostSth();

  const addNewTaskHandler = handleSubmit(async (vals) => {
    addNewTask(
      {
        ...vals,
        assistanceId: "af32dcc5-279d-ef11-b6e7-9ae1b6d917d9",
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["AssistanceWork"],
          });
          setShow(false);
          console.log(data);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
  });

  return (
    <Fragment>
      <Card className="mb-0 r-2">
        <Button color="primary" onClick={() => setShow(true)}>
          افزدون تسک جدید
        </Button>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">اطلاعات تسک را وارد کنید</h1>
          </div>
          <form onSubmit={addNewTaskHandler}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  عنوان تسک
                </Label>
                <Controller
                  control={control}
                  name="worktitle"
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="worktitle"
                        placeholder="عنوان تسک"
                        value={field.value}
                        invalid={errors.firstName && true}
                      />
                    );
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="workDescribe">
                  توضیحات تسک
                </Label>
                <Controller
                  name="workDescribe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="workDescribe"
                      placeholder="توضیحات تسک"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className="form-label" for="workDate">
                  ساعت کاری
                </Label>
                <Controller
                  name="workDate"
                  control={control}
                  render={({ field }) => (
                    <Input type="date" {...field} id="workDate" />
                  )}
                />
                {errors.username && (
                  <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
                )}
              </Col>
              {/* <Col xs={6}>
                <Label className="form-label" for="assistanceId">
                  انتخاب دوره
                </Label>
                <Controller
                  name="assistanceId"
                  control={control}
                  rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                  render={({ field }) => (
                    <Input type="select" id="assistanceId" {...field}>
                      {data?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.courseName}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                {errors.assistanceId && (
                  <FormFeedback>{errors.assistanceId.message}</FormFeedback>
                )}
              </Col> */}

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ثبت
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => setShow(false)}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddUserModal;