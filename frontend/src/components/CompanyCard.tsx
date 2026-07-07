import { useState } from "react";
import "./CompanyCard.css";

import type { Company } from "../types/company";
import type { Job } from "../types/job";

type Props = {
  companies: Company[];
  jobs: Job[];

  onAdd: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
};

function CompanyCard({
  companies,
  jobs,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [editCompanyId, setEditCompanyId] = useState<number | null>(null);

  const [addForm, setAddForm] = useState<Company>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
    jobs: [],
  });

  const [editForm, setEditForm] = useState<Company>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
    jobs: [],
  });

  const handleAdd = () => {
    onAdd(addForm);

    setAddForm({
      id: 0,
      name: "",
      email: "",
      phone: "",
      location: "",
      jobs: [],
    });
  };

  const handleSave = () => {
    onEdit(editForm);

    setEditCompanyId(null);

    setEditForm({
      id: 0,
      name: "",
      email: "",
      phone: "",
      location: "",
      jobs: [],
    });
  };

  const handleCancel = () => {
    setEditCompanyId(null);

    setEditForm({
      id: 0,
      name: "",
      email: "",
      phone: "",
      location: "",
      jobs: [],
    });
  };

  return (
    <div className="company-container">
      <h2 className="section-title">Companies</h2>

      {companies.map((company) => (
        <div key={company.id} className="company-card">
          {editCompanyId === company.id ? (
            <>
              <input
                type="text"
                value={editForm.name}
                placeholder="Company Name"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                value={editForm.email}
                placeholder="Email"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editForm.phone}
                placeholder="Phone"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    phone: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editForm.location}
                placeholder="Location"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    location: e.target.value,
                  })
                }
              />

              <div className="button-group">
                <button onClick={handleSave}>Save</button>

                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{company.name}</h3>

              <p>📧 {company.email}</p>

              <p>📞 {company.phone}</p>

              <p>📍 {company.location}</p>

              <div className="button-group">
                <button
                  onClick={() => {
                    setEditCompanyId(company.id);
                    setEditForm(company);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => onDelete(company.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="add-company">
        <h3>Add Company</h3>

        <input
          type="text"
          placeholder="Company Name"
          value={addForm.name}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={addForm.email}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={addForm.phone}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              phone: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={addForm.location}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              location: e.target.value,
            })
          }
        />

        <button onClick={handleAdd}>
          Add Company
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;