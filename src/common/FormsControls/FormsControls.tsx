import styles from "./FormsControls.module.css"
import React, {ReactNode} from "react";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


type FormControlsPropsType={
    meta: WrappedFieldMetaProps
    children: ReactNode
}


const FormControl: React.FC<FormControlsPropsType> = ({meta, ...props}) => {
    const  hasError = meta.error && meta.touched
    return(
        <div className={styles.formControl+ " " + (hasError ? styles.error: "")}>
            {props.children}

            { hasError && <span> {meta.error}</span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,  ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}