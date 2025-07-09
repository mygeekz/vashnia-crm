import React from 'react';

interface GlassTableProps {
  headers: string[];
  children: React.ReactNode;
}

export const GlassTable: React.FC<GlassTableProps> = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-right text-gray-300">
        <thead className="text-xs text-green-300 uppercase bg-white/5 border-b border-white/20">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

interface GlassTableRowProps {
    children: React.ReactNode;
}

export const GlassTableRow: React.FC<GlassTableRowProps> = ({ children }) => {
    return (
        <tr className="bg-white/5 border-b border-white/10 hover:bg-white/20 transition-colors duration-200">
            {children}
        </tr>
    );
}

interface GlassTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}

export const GlassTableCell: React.FC<GlassTableCellProps> = ({ children, className, ...rest }) => {
    return (
        <td {...rest} className={`px-6 py-4 ${className || ''}`.trim()}>
            {children}
        </td>
    )
}