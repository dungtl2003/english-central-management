export function LoadingUpdateBaseSalary() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="flex space-x-2 mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
            </div>
            <p className="text-white text-lg">Updating...</p>
        </div>
    );
}
