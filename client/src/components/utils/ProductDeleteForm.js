import React, { useEffect, useState } from 'react'
import { Form, Modal, Select } from "antd";
import { reasonsData } from "./Data";

const { Option } = Select;

function ProductDeleteForm(props) {
    const [ReasonValue, setReasonValue] = useState("已出售");
    const onReasonChange = (value) => { setReasonValue(value) };

    useEffect(() => {
        if (props.admin) {
            setReasonValue("商品涉嫌违规已下架")
        }
    }, [props.admin])

    const handleOk = () => {
        const reason = {
            reason: ReasonValue
        }

        props.handleOk(reason);
        setReasonValue("");
    }

    const handleCancel = () => {
        props.handleCancel();
        setReasonValue("");
    }

    return (
        <div>
            <Modal
                title="Product"
                visible={props.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form>
                    <label>下架原因:</label>&nbsp;
                    {props.admin ?
                    <Select
                        style={{ width: 200 }}
                        placeholder
                        onChange={onReasonChange}
                        value={ReasonValue}
                    >
                        <Option value={"商品涉嫌违规已下架"}>商品涉嫌违规已下架</Option>
                        <Option value={"其他原因"}>其他原因</Option>
                    </Select> :
                    <Select
                        style={{ width: 200 }}
                        placeholder
                        onChange={onReasonChange}
                        value={ReasonValue}
                    >
                        {reasonsData.map((reason) => <Option value={reason.value}>{reason.value}</Option>)}
                    </Select>
                    }
                    <br /><br />
                </Form>
            </Modal>
        </div>
    )
}

export default ProductDeleteForm
