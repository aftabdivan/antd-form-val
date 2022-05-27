import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import db2 from "./FireBase";
import {addDoc, collection} from "firebase/firestore";
import "./App.css";

function App() {
  const [form]=Form.useForm();
  const database=collection(db2,"antd")
  const startDate=new Date(new Date().getFullYear,new Date().getMonth,10)

  const onSubmitHandler=async(value)=>{
      console.log({value})
      console.log(value)
      await addDoc(database,{
        fullname:value.fullname,
        email:value.email,
         password:value.password,
         confirmPassword:value.confirmPassword,
          gender:value.gender,
         dob:value.dob._d,
         website:value.website,
        agreement:value.agreement
      })
      //form.resetFields();
    }
  

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Form
            form={form}
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={onSubmitHandler}
          >
            <Form.Item
              name="fullname"
              label="Full Name"
              rules={[
                { required: true, message: "enter name" },
                { whitespace: true },
                { min: 5 },
              ]}
              hasFeedback
            >
              <Input placeholder="your name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: "enter email" },
                { type: "email", message: "enter valid" },
              ]}
              hasFeedback
            >
              <Input placeholder="your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "enter password" }]}
              hasFeedback
            >
              <Input.Password placeholder="your password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("password does not match");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password placeholder="your password" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" requiredMark="optional">
              <Select placeholder="select your gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              name="dob"
              label="Date of birth"
              rules={[{ required: true, message: "enter email" }]}
              hasFeedback
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                placeholder="Choose your birthdate"
              />
            </Form.Item> */}
            <Form.Item
              name="website"
              label="Website"
              rules={[{ type: "url", message: "enter valid url" }]}
            >
              <Input picker="date" placeholder="enter website url" />
            </Form.Item>

            <Form.Item
              name="agreement"
              wrapperCol={{ span: 24 }}
              valuePropName="checked"
              rules={[
                {
                  validator:(_,value)=>value ? Promise.resolve():Promise.reject("please select agree for further process") 
                },
             ]}
              hasFeedback
            >
              <Checkbox>
                Agree to our <a href="#">Terms and Condition</a>
              </Checkbox>
            </Form.Item>

            <Form.Item name="submit" wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </header>
      </div>
    </>
  );
}

export default App;
