// src/pages/buy/index.tsx
import { Link } from 'react-router-dom';

export default function BuyPage() {
  const popularChoices = [
    { label: 'Ready To Move', slug: 'ready-to-move' },
    { label: 'Possession within 1 year', slug: 'possession-within-1-year' },
    { label: 'Possession within 2 year', slug: 'possession-within-2-year' },
    { label: 'Possession in More than 2 Years', slug: 'possession-more-than-2-years' },
    { label: 'New Launch Projects', slug: 'new-launch-projects' },
  ];

  const propertyTypes = [
    { label: 'Flat in Ahmedabad', slug: 'flat-in-ahmedabad' },
    { label: 'House for sale in Ahmedabad', slug: 'house-in-ahmedabad' },
    { label: 'Villa in Ahmedabad', slug: 'villa-in-ahmedabad' },
  ];

  const budgets = [
    { label: 'Under 50 Lac', slug: 'under-50-lac' },
    { label: '50 Lac to 75 Lac', slug: '50-lac-to-75-lac' },
    { label: '75 Lac to 1.25 Cr', slug: '75-lac-to-1-25-cr' },
    { label: '1.25 Cr to 2 Cr', slug: '1-25-cr-to-2-cr' },
    { label: '2 Cr to 3 Cr', slug: '2-cr-to-3-cr' },
    { label: '3 Cr to 5 Cr', slug: '3-cr-to-5-cr' },
    { label: '5 Cr+', slug: '5-cr-plus' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Buy Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Popular Choices */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Popular Choices</h2>
          <ul className="space-y-2">
            {popularChoices.map((choice) => (
              <li key={choice.slug}>
                <Link
                  to={`/buy/${choice.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {choice.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Type */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Property Type</h2>
          <ul className="space-y-2">
            {propertyTypes.map((type) => (
              <li key={type.slug}>
                <Link
                  to={`/buy/${type.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {type.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Budget */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Budget</h2>
          <ul className="space-y-2">
            {budgets.map((budget) => (
              <li key={budget.slug}>
                <Link
                  to={`/buy/${budget.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {budget.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}