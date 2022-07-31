import styles from "./FormsControls.module.css"





const FormControl = ({input, meta, element, ...props}) => {
    const  hasError = meta.error && meta.touched
    return(
        <div className={styles.formControl+ " " + (hasError ? styles.error: "")}>
            {props.children}

            { hasError && <span> {meta.error}</span>}
        </div>
    )
}

export const Input = (props) => {
    const {input, meta, element, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export const Textarea = (props) => {
    const {input, meta, element, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}