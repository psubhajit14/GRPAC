import { Table, Tag } from "antd";
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useCallback, useEffect, useState } from "react";

import { getDocs, collection, getDocsFromCache } from "@firebase/firestore"
import { firestore } from "../database/firebaseUtil";
import * as Constants from "../data";

export const DataGrid: React.FC<any> = () => {


    interface DataType {
        name: string;
        email: string;
        gender: string;
        mobileNo: string;
        occupation: string;
        district: string;
        block: string;
        mouza: string;
        pin: string;
    }
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const getDBData = useCallback(async () => {
        setLoading(true)
        let snapshot: any;
        try {
            snapshot = await getDocs(collection(firestore, "test_data"));
        }
        catch (e) {
            snapshot = await getDocsFromCache(collection(firestore, "test_data"));
        }
        if (!snapshot.empty)
            setData(snapshot?.docs.map((item: any) => item.data()));
        setLoading(false)
    }, [])
    useEffect(() => {
        getDBData();
    }, [getDBData])
    console.log("data", data)



    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend'],
            fixed: "left"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            render: (value, _, __) => {
                return (
                    <>{value === "male" && <Tag>Male</Tag>}{value === "female" && <Tag>Female</Tag>}</>
                )
            },
        },
        {
            title: 'Contact No',
            dataIndex: 'mobileNo',
            render: (value, _, __) => {
                return (
                    <>+91-{value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6, 4)}</>
                )
            }
        },
        {
            title: 'Occupation',
            dataIndex: 'occupation',
            render: (value, _, __) => {
                return (
                    <>{Constants.data.occupationList.find(item => item.value === value)?.label}</>
                )
            }
        },
        {
            title: 'District',
            dataIndex: 'district',
            render: (value, _, __) => value.split("] ")[1]
        },
        {
            title: 'Block',
            dataIndex: 'block',
            render: (value, _, __) => value.split("] ")[1]
        },
        {
            title: 'Mouza',
            dataIndex: 'mouza',
            render: (value, _, __) => value?.split("] ")[1]
        },
        {
            title: 'Pin Code',
            dataIndex: 'pin',
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table loading={loading} columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 5, hideOnSinglePage: true }} scroll={{ x: 1500, y: 600 }} />
    );
}
