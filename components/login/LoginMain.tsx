import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { text } from "stream/consumers";

const LoginMain = () => {
  const [id, setId] = useState("");
  const [psword, setpsword] = useState("");
  const router = useRouter();
  

  const test = () => {
    console.log(id,psword)
  }

  const successLogin = () => {
    router.push(
      {
        pathname: "/",
        query: {
          user: "광희",
          psword: 1234,
        },
      },
      "/"
    );
  };
  //<button onClick={successLogin}>로그인하기</button>
  return (
    <Form>
      <Form.Field>
        <input placeholder="id"name="id" onChange={(e) => setId(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <input
        name="psword"
          type="password"
          placeholder="password"
          onChange={(e) => setpsword(e.target.value)}
        />
      </Form.Field>

      <Button type="submit" onClick={test}>Submit</Button>
    </Form>
  );
};

export default LoginMain;
