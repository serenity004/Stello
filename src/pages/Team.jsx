import React, { useState } from 'react';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  User
} from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Team = () => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@stello.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      avatar: 'JD',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah.miller@stello.com',
      phone: '+1 (555) 234-5678',
      role: 'Manager',
      avatar: 'SM',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@stello.com',
      phone: '+1 (555) 345-6789',
      role: 'Sales',
      avatar: 'RJ',
      status: 'Active'
    }
  ];

  const roles = ['Admin', 'Manager', 'Sales', 'Support'];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-danger-100 text-danger-800';
      case 'Manager':
        return 'bg-primary-100 text-primary-800';
      case 'Sales':
        return 'bg-success-100 text-success-800';
      case 'Support':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => setIsAddMemberModalOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Add Member
        </Button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center mr-3 shadow-sm">
                  <span className="text-white font-semibold">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800">{member.name}</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-secondary-600">
                <Mail className="w-4 h-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-secondary-600">
                <Phone className="w-4 h-4 mr-2" />
                {member.phone}
              </div>
              <div className="flex items-center text-sm text-secondary-600">
                <User className="w-4 h-4 mr-2" />
                {member.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Add Team Member"
        size="md"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">First Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter first name"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Last Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter last name"
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter email address"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter phone number"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
            <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => setIsAddMemberModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Team; 