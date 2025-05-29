import { type FC } from 'react'
import type { Category } from '../utils/CategoryTypes'

//props type for the WidgetsList component
interface typWidgetList{
    activeCategory: Category | undefined ,
    selectedWidgets: {[key:string]:boolean},
    handleCheckbox: (id:string)=>void
}
const WidgetsList: FC<typWidgetList> = ({activeCategory, selectedWidgets, handleCheckbox}) => {
    return (
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {activeCategory ? (
                <>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">
                        {activeCategory.name}
                    </h3>
                    <div className="space-y-3">
                        {activeCategory.widgets.map((widget) => (
                            <label
                                key={widget.id}
                                className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer transition"
                            >
                                <input
                                    type="checkbox"
                                    checked={!!selectedWidgets[widget.id]}
                                    onChange={() => handleCheckbox(widget.id)}
                                    className="mt-1 cursor-pointer accent-blue-600"
                                />
                                <div>
                                    <div className="font-semibold text-gray-800">
                                        {widget.widgetName}
                                    </div>
                                    <div className="text-sm text-gray-600">{widget.widgetText}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </>
            ) : (
                // if no active category is selected
                <p>No category found.</p>
            )}
        </div>
    )
}

export default WidgetsList
