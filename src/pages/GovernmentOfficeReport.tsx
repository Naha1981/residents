import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import { ReportMedia } from '../types/report';

interface GovernmentOfficeReportForm {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  officeName: string;
  department: string;
  issueType: string;
  description: string;
  date: string;
  time: string;
  referenceNumber?: string;
  media: ReportMedia[];
}

export default function GovernmentOfficeReport() {
  const { register, handleSubmit, setValue, watch } = useForm<GovernmentOfficeReportForm>();
  const navigate = useNavigate();
  const isAnonymous = watch('isAnonymous');

  const onSubmit = (data: GovernmentOfficeReportForm) => {
    // Here you would typically send the data to your backend
    console.log(data);
    // For now, just redirect to home
    navigate('/');
  };

  const handleFileSelect = (files: ReportMedia[]) => {
    setValue('media', files);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 flex items-center justify-center bg-metallic-gradient px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-metallic-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Report Government Office Issue</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('isAnonymous')}
              id="isAnonymous"
              className="w-4 h-4 text-indigo-600 border-gray-700 rounded focus:ring-indigo-500"
            />
            <label htmlFor="isAnonymous" className="text-sm font-medium">
              Report Anonymously
            </label>
          </div>

          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: !isAnonymous })}
                  className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: !isAnonymous })}
                  className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Office Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('officeName', { required: true })}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter government office name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              {...register('department', { required: true })}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select department</option>
              <option value="licensing">Licensing</option>
              <option value="taxation">Taxation</option>
              <option value="registration">Registration</option>
              <option value="permits">Permits</option>
              <option value="social-services">Social Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Type of Issue <span className="text-red-500">*</span>
            </label>
            <select
              {...register('issueType', { required: true })}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select issue type</option>
              <option value="long-wait">Long Wait Times</option>
              <option value="poor-service">Poor Service</option>
              <option value="procedural">Procedural Issues</option>
              <option value="documentation">Documentation Problems</option>
              <option value="staff-conduct">Staff Conduct</option>
              <option value="corruption">Corruption</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date of Incident <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('date', { required: true })}
                className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Time of Incident <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register('time', { required: true })}
                className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reference Number (if applicable)
            </label>
            <input
              type="text"
              {...register('referenceNumber')}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter application/file/reference number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Provide details about the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Supporting Documents <span className="text-red-500">*</span>
            </label>
            <FileUpload
              onFileSelect={handleFileSelect}
              value={watch('media')}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Report
          </button>
        </form>
      </motion.div>
    </div>
  );
}