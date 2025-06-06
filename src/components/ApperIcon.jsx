import { 
  Home,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Upload,
  Filter,
  Smile,
  LayoutDashboard,
  TrendingUp,
  UserPlus
} from 'lucide-react';

const iconMap = {
  Home,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Upload,
  Filter,
  Smile,
  LayoutDashboard,
  TrendingUp,
  UserPlus
};

const ApperIcon = ({ name, size = 20, className = '', ...props }) => {
  const IconComponent = iconMap[name] || Home;
  
  if (!iconMap[name]) {
    console.warn(`Icon "${name}" does not exist in the icon map`);
  }
  
  return <IconComponent size={size} className={className} {...props} />;
};

export default ApperIcon;