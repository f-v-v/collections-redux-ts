import React, { useState, useEffect } from 'react'
import { ICollection } from '../../types/collection'

type Props = {
    collection: ICollection,
    onSave: (collection:ICollection) =>void
    onClose: () => void
}

export const Collection: React.FC<Props > = ({collection, onSave, onClose}) => {
    const [id, setId] =useState(collection.id) //нужно ли?
    const [name, setName] =useState(collection.name)
    const [type, setType] =useState(collection.type)
    const [questions, setQuestions] =useState(collection.questions)
    const [active, setActive] =useState(collection.active)
    
    useEffect(()=> {
        setId(collection.id)
        setName(collection.name)
        setType(collection.type)
        setQuestions(collection.questions)
        setActive(collection.active)
    }, [collection])
    
    const handlName = (e: React.FormEvent<HTMLInputElement>): void => {
        setName(e.currentTarget.value)
    }
    const handlType = (e: React.FormEvent<HTMLInputElement>): void => {
        setType(+e.currentTarget.value)
    }
    const handlQuestions = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuestions(+e.currentTarget.value)
    }
    const handlActive = (e: React.FormEvent<HTMLInputElement>): void => {
        setActive(e.currentTarget.checked)
    }
    const handlSave = (): void => {
        const state = {
            id,
            name,
            type,
            questions,
            active
        }
        onSave(state)
    }
    const handlClose = (e: React.FormEvent<HTMLButtonElement>):void => {
        e.preventDefault()
        onClose()
    }
    

    return (<form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={id} disabled
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Наименование</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name} 
                            onChange={handlName}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Тип</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={type}
                            onChange={handlType}                        
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Вопросов</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={questions} 
                            onChange={handlQuestions}    
                        />
                    </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-2">Активна</div>
                <div className="col-sm-10">
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={active} 
                        onChange={handlActive}    
                    />
                    <label className="form-check-label" >
                        Коллекция активна
                    </label>
                    </div>
                </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2">
                        <button 
                            // type="submit" 
                            className="btn btn-primary"
                            onClick={handlSave}
                        >Сохранить</button>
                    </div>
                    <div className="col-sm-2">
                        <button 
                            // type="submit" 
                            className="btn btn-primary"
                            onClick={handlClose}
                        >Закрыть</button>
                    </div>
                </div>
            </form>
      )
}
