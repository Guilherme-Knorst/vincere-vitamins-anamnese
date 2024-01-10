import * as Form from '@radix-ui/react-form'


export default function Question({}) {
  return (
    <div className='p-24 w-full bg-white rounded-md'>
      <Form.Root>
        <Form.Field name='email'>
          <Form.Label>Email</Form.Label>
          {/* <Form.Control/>
          <Form.Message /> */}
          {/* <Form.ValidityState name='oi'/> */}
        </Form.Field>

        <Form.Submit />
      </Form.Root>
    </div>
  )
}